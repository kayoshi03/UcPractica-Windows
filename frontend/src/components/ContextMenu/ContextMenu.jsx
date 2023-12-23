const ContextMenu = ({show,children}) => {
    return (
            show ?
            <>
                {children}
            </>
            :
            <>
            </>
    )
}

export default ContextMenu