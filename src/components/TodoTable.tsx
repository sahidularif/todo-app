import React from 'react';
interface ITask {
    id: string,
    taskName: string;
    deadline: number;
    isComplete: boolean;
}
type TodoTableProps = {
    todoList: ITask[];
    handleIsComplete: (id: string) => any;
    deleteTodo: (id: string) => void;
}
const todoTable = ({ todoList, handleIsComplete, deleteTodo }: TodoTableProps) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Task Name</th>
                    <th>Deadline</th>
                    <th>Action</th>
                </tr>
                {
                    todoList.map((todo, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <input type="checkbox"
                                        checked={todo.isComplete ? true : false}
                                        onChange={() => handleIsComplete(todo.id)}
                                        id="isComplete" name="isComplete" /> &nbsp;
                                    {todo.isComplete ? <del>{todo.taskName}</del> : <span>{todo.taskName}</span>}
                                </td>
                                <td>{todo.deadline}</td>
                                <td title='Delete todo' onClick={() => deleteTodo(todo.id)} style={{ cursor: 'pointer' }}>X</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    );
};

export default todoTable;