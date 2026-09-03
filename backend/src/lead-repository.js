import mongoose from "mongoose";

const connectionString = process.env.MONGO_URI;

if (!connectionString) throw new Error("MONGO_URI is required.");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  phone: { type: String, required: true, index: true },
  projectType: { type: String, required: true },
  propertyType: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String, default: null },
  budget: { type: String, required: true },
  preferredStartDate: { type: String, default: null },
  message: { type: String, required: true },
  consent: { type: Boolean, required: true },
  status: { type: String, required: true, default: "NEW", index: true },
  source: { type: String, required: true, default: "website" },
  notes: { type: String, default: null },
  assignedTo: { type: String, default: null },
}, { timestamps: true });

leadSchema.index({ createdAt: -1 });

// Ensure we don't overwrite the model if it's already compiled
const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export async function ensureDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(connectionString);
}

export async function createLead(lead) {
  const result = await Lead.create({
    name: lead.name,
    email: lead.email.toLowerCase(),
    phone: lead.phone,
    projectType: lead.projectType,
    propertyType: lead.propertyType,
    location: lead.location,
    area: lead.area || null,
    budget: lead.budget,
    preferredStartDate: lead.preferredStartDate || null,
    message: lead.message,
    consent: lead.consent,
    source: lead.source
  });
  
  const obj = result.toObject();
  return {
    id: obj._id.toString(),
    name: obj.name,
    email: obj.email,
    phone: obj.phone,
    projectType: obj.projectType,
    propertyType: obj.propertyType,
    location: obj.location,
    area: obj.area,
    budget: obj.budget,
    preferredStartDate: obj.preferredStartDate,
    message: obj.message,
    consent: obj.consent,
    status: obj.status,
    source: obj.source,
    notes: obj.notes,
    assignedTo: obj.assignedTo,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt
  };
}

export async function listLeads({ search, status, limit, offset }) {
  const query = {};
  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { phone: new RegExp(search, "i") }
    ];
  }
  if (status) {
    query.status = status;
  }

  const items = await Lead.find(query)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const total = await Lead.countDocuments(query);
  
  return { 
    items: items.map(obj => ({
      ...obj,
      id: obj._id.toString(),
      _id: undefined,
      __v: undefined
    })), 
    total 
  };
}

export async function updateLead(id, update) {
  const fields = { status: "status", notes: "notes", assignedTo: "assignedTo" }; 
  const entries = Object.entries(update).filter(([key]) => key in fields);
  if (!entries.length) return null;
  
  const sets = {};
  for (const [key, value] of entries) {
    sets[fields[key]] = value;
  }
  
  const result = await Lead.findByIdAndUpdate(id, { $set: sets }, { new: true }).lean();
  if (!result) return null;
  
  return {
    ...result,
    id: result._id.toString(),
    _id: undefined,
    __v: undefined
  };
}

export async function dashboardStats() {
  const stats = await Lead.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);
  
  const counts = {};
  let total = 0;
  
  for (const stat of stats) {
    counts[stat._id] = stat.count;
    total += stat.count;
  }
  
  return { 
    total, 
    counts, 
    conversionRate: total ? Number((((counts.WON ?? 0) / total) * 100).toFixed(1)) : 0 
  };
}
