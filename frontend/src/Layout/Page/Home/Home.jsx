import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import Board from "../../../components/Board/Board";
import DragDrop from "../../../components/DragDrop";

const Home = () => {
    return(
        <>
            <DndProvider backend={HTML5Backend}>


            </DndProvider>
        </>
    )
};

export default Home;