import { ChangeEvent, FormEvent } from 'react';
type AddTodoProps = {
    task: string;
    deadline: number;
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const AddTodo = ({ handleSubmit, handleChange, task, deadline }: AddTodoProps) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={task} name="task" onChange={handleChange} required />
                <input type="number" value={deadline} name="deadline" onChange={handleChange} required />
                <input type="submit" name="submit" value="ADD TODO" />
            </form>
        </div>
    );
};

export default AddTodo;