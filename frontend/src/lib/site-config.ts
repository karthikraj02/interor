/**
 * Centralizes the environment-configured business facts that would
 * otherwise be hardcoded or fabricated across components. Every value here
 * is either a real value supplied via env vars, or `undefined`/a neutral
 * fallback — never an invented phone number, address, or statistic.
 */
export function getSiteConfig() {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Interior Design Studio";
  const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY;
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const whatsappMessage = "Hi, I would like to discuss an interior design project.";
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : undefined;
  const telHref = phoneDisplay ? `tel:${phoneDisplay.replace(/[^+\d]/g, "")}` : undefined;

  return { businessName, phoneDisplay, whatsappHref, telHref, instagramUrl, youtubeUrl, facebookUrl };
}
