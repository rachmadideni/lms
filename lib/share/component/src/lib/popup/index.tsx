export const Popup: React.FC<PopupProps> = ({ children, ...props }) => {
  return (
    <div
      className={`absolute top-12 -right-20 w-[442px] h-full p-4 flex justify-center items-center border-2 border-gray-200 bg-white rounded-lg shadow-2xl ${
        props.visible ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
  );
};
