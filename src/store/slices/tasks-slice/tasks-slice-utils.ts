import type {RawTasksDto, TasksDto} from './tasks-slice-types'

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
        stages: [{
          id: rt.Stage_ID,
          name: rt.Stage_Name,
          disabled: rt.stage_status === 0,
          pending: rt.stage_status === 2,
          hasResults: rt.stage_status === 3,
          hasExtendedResults: !!rt.ExtendedResults,
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
            disabled: rt.stage_status === 0,
            pending: rt.stage_status === 2,
            hasResults: rt.stage_status === 3,
            hasExtendedResults: !!rt.ExtendedResults,
          }
        ]
      }
    }
  })


  return tasks;
}