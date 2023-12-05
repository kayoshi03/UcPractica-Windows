import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import Board from "../../../components/Board/Board";

const Home = () => {
    return(
        <>
            <DndProvider backend={HTML5Backend}>
                <Board/>
            </DndProvider>
        </>
    )
};

export default Home;