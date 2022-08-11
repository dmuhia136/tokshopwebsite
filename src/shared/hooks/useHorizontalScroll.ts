
const useHorizontalScroll = () => {
	const scrollLeft = (ref: React.MutableRefObject<any>) => {
		ref.current.scrollLeft -= 550;
	};
	const scrollRight = (ref: React.MutableRefObject<any>) => {
		ref.current.scrollLeft += 550;
	};

	const scrollDown = (ref: React.MutableRefObject<any>) => {
		ref.current.scrollDown -= 550;
	};

   

	return { scrollLeft, scrollRight,scrollDown };
};

export default useHorizontalScroll;
