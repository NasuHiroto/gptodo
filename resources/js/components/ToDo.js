import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    List,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import ToDoDetail from "./ToDoDetail";
import {
    useDeleteToDoMutateTask,
    useUpdateToDoMutateTask,
} from "../hooks/ToDo";
import { AddCircle, Delete } from "@mui/icons-material";
import { useStoreToDoDetailMutateTask } from "../hooks/ToDoDetail";

function ToDo(props) {
    const [timer, setTimer] = useState(null);

    let toDo = {
        id: props.toDo.id,
        title: props.toDo.title,
    };

    /** ToDo名称更新イベント */
    const { updateToDoMutation } = useUpdateToDoMutateTask();
    const eventUpdateToDo = (event) => {
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            let data = {
                ...toDo,
                title: event.target.value,
            };
            updateToDoMutation.mutate(data);
        }, 500);

        setTimer(newTimer);
    };

    /** ToDo削除イベント */
    const { deleteToDoMutation } = useDeleteToDoMutateTask();
    const eventDeleteToDo = (event) => {
        deleteToDoMutation.mutate(toDo);
    };

    /** ToDoDetail追加イベント */
    const { storeToDoDetailMutation } = useStoreToDoDetailMutateTask();
    const eventStoreToDoDetail = (event) => {
        storeToDoDetailMutation.mutate(toDo);
    };

    return (
        <Card>
            <TextField
                variant="standard"
                margin="dense"
                defaultValue={props.toDo.title}
                fullWidth
                onChange={eventUpdateToDo}
            />
            <CardContent>
                <List>
                    {props.toDo.to_do_details.map((detail) => {
                        return <ToDoDetail key={detail.id} detail={detail} />;
                    })}
                </List>
            </CardContent>
            <CardActions>
                <IconButton
                    edge="start"
                    aria-label="add"
                    color="primary"
                    onClick={eventStoreToDoDetail}
                >
                    <AddCircle />
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={eventDeleteToDo}
                >
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ToDo;
