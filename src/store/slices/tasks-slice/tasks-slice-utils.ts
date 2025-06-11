import type {RawTasksDto, TasksDto} from "./tasks-slice-types"

type ConvertRawTasksArgs = {
  rawTasks: RawTasksDto;
}
export const convertRawTasks = ({rawTasks}: ConvertRawTasksArgs): TasksDto => {
  const tasks: TasksDto = [];

  rawTasks.forEach(rt => {
    const existedTaskIndex = tasks?.findIndex(t => t?.id === rt.Script_ID);

    if (existedTaskIndex === -1) {
      tasks.push({
        id: rt.Script_ID,
        name: rt.Script_Name,
        active: rt.Script_Active_Flag,
        hasResults: rt.Result_Flag,
        stages: [{
          id: rt.Stage_ID,
          name: rt.Stage_Name,
          active: rt.Stage_Active_Flag,
        }],
      })
    } else {
      const taskToEdit = tasks[existedTaskIndex];

      tasks[existedTaskIndex] = {
        ...taskToEdit,
        stages: [
          ...taskToEdit.stages,
          {
            id: rt.Stage_ID,
            name: rt.Stage_Name,
            active: rt.Stage_Active_Flag,
          }
        ]
      }
    }
  })


  return tasks;
}