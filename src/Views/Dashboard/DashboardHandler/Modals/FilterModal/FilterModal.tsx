import CustomDropdown from '../../../../../Shared/CustomDropdown';

const FilterModal = () => {
    console.log('dfgdfgdfgdfg ');
    
  return (
    <div className="w-full max-w-[1137px] py-[10px] box-border rounded-[10px] border-[1px] border-solid border-[#ccc]">
      <CustomDropdown
        toggleClassName="cursor-pointer flex items-center justify-end bg-white text-[20px] font-medium font-urw-geometric-regular text-grey "
        mainContainerStyle="w-full max-w-[1137px] pl-[12.61px] box-border"
        containerStyle="flex-1 flex flex-row justify-between pr-7 "
        placeholder={`Test`}
        options={[
          { label: '30', value: '30' },
          { label: '60', value: '60' },
          { label: '90', value: '90' },
        ]}
        onChange={(op) => console.log(op)}
      />
    </div>
  );
};

export default FilterModal;
