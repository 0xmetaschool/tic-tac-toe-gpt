/**
 * @fileoverview Board Size Selector Component
 * Allows users to select the game board size with visual previews
 */

import React from 'react';
import BoardPreview from './BoardPreview';

interface BoardSizeSelectorProps {
  selectedSize: 3 | 4 | 5;
  onSelectSize: (size: 3 | 4 | 5) => void;
}

/**
 * BoardSizeSelector Component
 * 
 * Provides an interactive interface for selecting the game board size.
 * Displays visual previews of different board sizes and handles selection.
 * 
 * @param props - Component props
 * @param props.selectedSize - Currently selected board size
 * @param props.onSelectSize - Callback function when size is changed
 * 
 * @returns React Component
 */

const BoardSizeSelector = ({ selectedSize, onSelectSize }: BoardSizeSelectorProps) => {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-semibold text-center">
        Select Board Size
      </h2>
      <div className="relative flex justify-center items-start gap-5 max-w-5xl mx-auto">
        {[3, 4, 5].map((size) => (
          <div 
            key={size} 
            className={`transform transition-transform duration-300 ${
              size === 4 ? 'translate-x-10' :
              size === 5 ? 'translate-x-20' :
              'z-10'
            }`}
          >
            <BoardPreview
              size={size as 3 | 4 | 5}
              isSelected={selectedSize === size}
              onClick={() => onSelectSize(size as 3 | 4 | 5)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardSizeSelector;