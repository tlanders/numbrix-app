import React, {Dispatch, SetStateAction} from "react";

type Props = {
    height: string,
    width: string,
    setWidth: Dispatch<SetStateAction<string>>,
    setHeight: Dispatch<SetStateAction<string>>
}

const ResizeBar = ({height, width, setWidth, setHeight}:Props) => {
    const onWidthChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        console.log('new width=', event.target.value);
        setWidth(event.target.value);
    }
    const onHeightChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        console.log('new height=', event.target.value);
        setHeight(event.target.value);
    }

    return (
        <div className={"resizeArea p-1 pt-3 col-md-4 col-sm-8 mx-auto"}>
            <div className={"row"}>
                <div className={"col-4"}>
                    <label htmlFor={"rows"}>Rows:&nbsp;</label>
                    <input
                        type={"text"}
                        size={2}
                        name={"rows"}
                        maxLength={2}
                        className={"resize-input"}
                        value={height}
                        onChange={onHeightChange}/>
                </div>
                <div className={"col-4"}>
                    <label htmlFor={"columns"}>Columns:&nbsp;</label>
                    <input
                        type={"text"}
                        size={2}
                        name={"columns"}
                        maxLength={2}
                        className={"resize-input"}
                        value={width}
                        onChange={onWidthChange}/>
                </div>
                <div className={"col-2"}>
                    <button
                        type={"button"}
                        className="resize-btn btn btn-sm btn-primary"
                        // onClick={onClearClick}
                    >Save</button>
                </div>
                <div className={"col-2"}>
                    <button
                        type={"button"}
                        className="resize-btn btn btn-sm btn-primary"
                        // onClick={onClearClick}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ResizeBar;
