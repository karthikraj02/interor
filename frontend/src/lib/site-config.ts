/**
 * Centralizes the environment-configured business facts that would
 * otherwise be hardcoded or fabricated across components. Every value here
 * is either a real value supplied via env vars (with the studio's own
 * details as the committed defaults), or `undefined`.
 */
export function getSiteConfig() {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Sai Interior Designers";
  const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 96117 91252";
  const phoneSecondary = process.env.NEXT_PUBLIC_PHONE_SECONDARY ?? "+91 94811 39020";
  const email = process.env.NEXT_PUBLIC_EMAIL ?? "info@saiinterior.in";
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+91 96117 91252").replace(/\D/g, "");
  const instagramUrl =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/sai_interior_designer";
  const youtubeUrl =
    process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://youtube.com/channel/UCXOiSIMxV22TeZPgP-Ob61A";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/saigypsum/";
  const whatsappMessage = "Hi, I would like to discuss an interior design project.";
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : undefined;
  const telHref = phoneDisplay ? `tel:${phoneDisplay.replace(/[^+\d]/g, "")}` : undefined;
  const telSecondaryHref = phoneSecondary ? `tel:${phoneSecondary.replace(/[^+\d]/g, "")}` : undefined;
  const emailHref = email ? `mailto:${email}` : undefined;

  return {
    businessName,
    phoneDisplay,
    phoneSecondary,
    email,
    emailHref,
    telHref,
    telSecondaryHref,
    whatsappHref,
    instagramUrl,
    youtubeUrl,
    facebookUrl,
  };
}
