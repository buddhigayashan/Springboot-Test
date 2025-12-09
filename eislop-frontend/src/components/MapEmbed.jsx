const MapEmbed = ({ latitude, longitude, label }) => {
  const url = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY || 'YOUR_KEY'}&q=${latitude},${longitude}`;
  return (
    <div className="h-64 w-full overflow-hidden rounded-lg border border-slate-200 shadow-sm">
      <iframe
        title={label ?? 'Delivery Route'}
        src={url}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapEmbed;
