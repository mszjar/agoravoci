import * as RadixSlider from "@radix-ui/react-slider";

interface ProgressSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  duration?: number;
}

const ProgressSlider: React.FC<ProgressSliderProps> = ({
  value = 0,
  onChange,
  duration = 0
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  const progress = (value / duration) * 100;

  return (
    <RadixSlider.Root
      className="
        relative
        flex
        items-center
        select-none
        touch-none
        w-full
        h-1
        cursor-pointer
        bg-gray-300
        rounded-full
      "
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      max={duration}
      aria-label="Progress"
    >
      <RadixSlider.Range
        className="
          bg-blue-500
          absolute
          rounded-full
          h-full
        "
        style={{ width: `${progress}%` }}
      />
      <RadixSlider.Track
        className="
          bg-gray-500
          relative
          h-full
          rounded-full
        "
      >
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default ProgressSlider;
