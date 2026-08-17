type MobileActionBarProps = {
  telHref?: string;
  whatsappHref?: string;
};

/**
 * Sticky mobile conversion bar. Renders only the actions that have a real
 * configured destination — a fake "Call" link with no number would be worse
 * than omitting the button.
 */
export function MobileActionBar({ telHref, whatsappHref }: MobileActionBarProps) {
  if (!telHref && !whatsappHref) return null;

  return (
    <div className="mobile-actions md:hidden">
      {telHref && <a href={telHref}>Call</a>}
      {whatsappHref && <a href={whatsappHref}>WhatsApp</a>}
      <a href="#contact">Get quote</a>
    </div>
  );
}
