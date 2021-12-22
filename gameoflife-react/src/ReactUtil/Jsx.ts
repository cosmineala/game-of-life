export interface IJsx {
    (): JSX.Element | JSX.Element[]
}

const returnJSX = ( jsx: IJsx ) => { return jsx() };

export default returnJSX;