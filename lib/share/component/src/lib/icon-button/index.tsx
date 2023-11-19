export const IconButton = ({
  icon,
  className,
  hasNotification = false,
  onClick,
}: {
  icon: React.ReactNode;
  className?: string;
  hasNotification?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button className={className} onClick={onClick}>
      {hasNotification && (
        <span className="absolute top-2 right-2 rounded-full w-2 h-2 bg-red-400"></span>
      )}
      {icon}
    </button>
  );
};
