import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useDeleteToDoDetailMutateTask = () => {
    const queryClient = useQueryClient();
    const deleteToDoDetailMutation = useMutation(
        async (toDoDetail) => axios.delete("/api/tododetails/" + toDoDetail.id),
        {
            onMutate: async (toDoDetail) => {
                // 実行中の取得処理をキャンセル
                await queryClient.cancelQueries("toDoList");

                // 既存のToDoリストを取得する
                const previousToDoList = queryClient.getQueriesData("toDoList");

                // ToDoリストのキャッシュを更新する
                queryClient.setQueryData("toDoList", (oldToDoList) =>
                    oldToDoList.map((oldToDo) => {
                        if (oldToDo.id === toDoDetail.to_do_id) {
                            const newToDoDetails = oldToDo.to_do_details.filter((oldToDoDetail) =>
                                oldToDoDetail.id !== toDoDetail.id
                            );
                            return {
                                ...oldToDo,
                                to_do_details: newToDoDetails,
                            };
                        }
                        return oldToDo;
                    })
                );

                // 削除に失敗した場合、既存のToDoリストを返却する
                return { previousToDoList };
            },
            onSettled: () => {
                queryClient.invalidateQueries("toDoList");
            },
        }
    );

    return { deleteToDoDetailMutation };
};

export default useDeleteToDoDetailMutateTask;
