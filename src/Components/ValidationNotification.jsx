const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed top-4 right-4 p-3 rounded-lg text-white font-semibold flex items-center justify-between shadow-lg ${bgColor} z-50`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold text-lg leading-none">&times;</button>
    </div>
  );
};
export default Notification;