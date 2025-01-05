import { useState } from "react";
import { ChevronDown } from "lucide-react";

const MenuCategory = ({ dishData, handleMenuCategory, selected }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-2 relative w-auto">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate">
          {selected
            ? Object.keys(dishData.dishes_data).find(
                (menu) => menu === selected,
              )
            : selected}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10"
          role="listbox"
        >
          <div className="py-1">
            {Object.keys(dishData.dishes_data).map((menu, inx) => (
              <div
                key={inx}
                className="relative flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  handleMenuCategory(menu);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={selected === menu}
              >
                <div className="flex items-center">
                  {/* Custom Radio Button */}
                  <div className="w-4 h-4 border rounded-full flex items-center justify-center mr-3">
                    {selected === menu && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className={`block truncate ${
                      selected === menu
                        ? "font-medium text-blue-600"
                        : "font-normal"
                    }`}
                  >
                    {menu}
                  </span>
                </div>

                {/* Selected Checkmark (optional) */}
                {selected === menu && (
                  <span className="absolute inset-y-0 right-4 flex items-center text-blue-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
