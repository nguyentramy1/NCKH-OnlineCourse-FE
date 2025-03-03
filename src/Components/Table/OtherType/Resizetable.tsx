import React, {
  useState,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";

interface ResizableTableProps {
  children: React.ReactNode; // Kiểu cho children
  onResize: (delta: number) => void; // Hàm nhận delta
  width: number; // Chiều rộng cột
}

const Resizetable: React.FC<ResizableTableProps> = ({
  children,
  onResize,
  width,
}) => {
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        onResize(e.movementX);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, onResize]);

  const handleMouseDown = (e: ReactMouseEvent) => {
    setIsResizing(true);
  };

  return (
    <th
      style={{ width: `${width}px`, position: "relative", userSelect: "none" }}
    >
      {children}
      <div
        style={{
          cursor: "col-resize",
          position: "absolute",
          right: "0",
          top: "0",
          height: "100%",
          width: "5px",
        }}
        onMouseDown={handleMouseDown}
      />
    </th>
  );
};

export default Resizetable;
