import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export interface ContextMenuItem {
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  icon?: string;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
}

export default function ContextMenu({ items }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleButtonClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <span ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
      <img
        ref={buttonRef}
        src='https://img.icons8.com/ios-glyphs/30/ellipsis.png'
        className='content-icon'
        alt='ellipsis'
        width='12'
        height='12'
        style={{ cursor: 'pointer', verticalAlign: 'middle', marginLeft: '8px' }}
        onClick={handleButtonClick}
        title='More options'
      />
      {isOpen && (
        <div ref={menuRef} className='context-menu'>
          {items.map((item, index) => (
            <div
              key={index}
              className={`context-menu-item${item.disabled ? ' context-menu-item-disabled' : ''}`}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick();
                  setIsOpen(false);
                }
              }}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt=''
                  width='12'
                  height='12'
                  style={{ marginRight: '8px', verticalAlign: 'middle' }}
                />
              )}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}
