import React, { useState } from "react";
import { Fab, Grid, Dialog, DialogContent, Button } from "@mui/material";
import ToDo from "../components/ToDo";
import { useCurrentToDoList, useGetToDoList } from "../hooks/ToDoList";
import { useStoreToDoMutateTask } from "../hooks/ToDo";
import { Add, LiveHelp } from "@mui/icons-material";
import { chat } from "./Chat";

const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
};

const helpButtonStyle = {
    position: "fixed",
    top: 16,
    right: 16,
    border: "1px solid #1976D2",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    fontSize: "16px",
};

function Home() {
    const { storeToDoMutation } = useStoreToDoMutateTask();
    const eventStoreToDo = (event) => {
        storeToDoMutation.mutate();
    };

    const [isChatOpen, setChatOpen] = useState(false);
    const [userQuestion, setUserQuestion] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const [isHelpDialogOpen, setHelpDialogOpen] = useState(false);

    const openChat = () => {
        setChatOpen(true);
    };

    const closeChat = () => {
        setChatOpen(false);
    };

    const startChat = async () => {
        setIsLoadingChat(true);

        try {
            const responseText = await chat(userQuestion);

            setChatResponse(responseText);
        } catch (error) {
            console.error("ChatGPT APIリクエストエラー:", error);
        } finally {
            setIsLoadingChat(false);
        }
    };

    const openHelpDialog = () => {
        setHelpDialogOpen(true);
    };

    const closeHelpDialog = () => {
        setHelpDialogOpen(false);
    };

    const { isLoading } = useGetToDoList();
    const toDoList = useCurrentToDoList();

    return (
        <div>
            <Grid container spacing={2}>
                {toDoList &&
                    toDoList.map((toDo) => (
                        <Grid item key={toDo.id} xs={12} sm={6} md={4} xl={3}>
                            <ToDo toDo={toDo} />
                        </Grid>
                    ))}
            </Grid>

            <Fab
                color="primary"
                aria-label="add"
                sx={fabStyle}
                onClick={eventStoreToDo}
            >
                <Add />
            </Fab>

            <Fab
                color="primary"
                aria-label="ChatGPT support"
                sx={{
                    position: "fixed",
                    bottom: 100,
                    right: 16,
                    border: "1px solid #1976D2",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                }}
                onClick={openChat}
            >
                <LiveHelp sx={{ fontSize: "32px", marginBottom: "2px" }} />
                <span
                    style={{
                        flex: 1,
                        color: "#FFFFFF",
                        fontSize: "8px",
                        zIndex: 2,
                    }}
                >
                    ChatGPT
                </span>
            </Fab>

            <Fab
                color="primary"
                aria-label="Help"
                sx={helpButtonStyle}
                onClick={openHelpDialog}
            >
                ?
            </Fab>

            <Dialog open={isChatOpen} onClose={closeChat}>
                <DialogContent>
                    <textarea
                        rows={4}
                        cols={50}
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)}
                        placeholder="Ask a question..."
                    />
                    <Button
                        variant="contained"
                        onClick={startChat}
                        disabled={isLoadingChat}
                    >
                        Ask
                    </Button>
                    {isLoadingChat && <p>Loading...</p>}
                    {chatResponse && (
                        <div>
                            <h2>回答:</h2>
                            <p>
                                {chatResponse.split(/\n/).map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isHelpDialogOpen} onClose={closeHelpDialog}>
                <DialogContent>
                    <p>
                        <strong>ChatGPTの方法</strong><br />
                        右下のChatGPTボタンを押して表示された質問欄にやりたいことを単語で入力してください（例：掃除）。
                        <br />
                        入力後、ASKボタンを押すとやるべき順序の提案が返って来るので、それをもとにToDoを作成してください（回答は画面を再読み込みしない限りは残っています）。
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Home;
