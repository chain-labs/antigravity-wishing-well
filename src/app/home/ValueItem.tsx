interface ValueItemProps {
    itemTitle: string;
    imgSrc: string;
    imgText: string;
}

const ValueItem = ({ itemTitle, imgSrc, imgText }: ValueItemProps) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1 my-4 ml-4">
            <div className="bg-agblack px-4 py-8  h-[180px] w-[272px] flex flex-col items-center">
                <div className="w-[56px] h-[56px] mb-4">
                    <img className="w-full h-full" src={imgSrc} alt={imgSrc} />
                </div>
                <p className="font-sans text-base font-extrabold text-center uppercase">{itemTitle}</p>
            </div>
        </div>
    )
}

export default ValueItem;