import React from "react";

interface IProps{
    onChangeRenderer():void
}

const CHowTo: React.FC<IProps> = ( {onChangeRenderer} ) => {

    return(
        <ul
            className="howTo"
        >
            <li>Space: next generation</li>
            <li>Sift + R: reset</li>
            <button
                onClick={ () => { onChangeRenderer() } }
            > Change renderer </button>
        </ul>
    );
}

export default CHowTo;