export type RawScriptDto = {
  Script_ID: string;
  Script_Name: string;
  Script_Active_Flag: boolean;
  Result_Flag: boolean;
}
export type ScriptDto = {
  id: string;
  name: string;
  active: boolean;
  stages: StageDto[];
}
export type RawStageDto = {
  Stage_ID: string;
  Stage_Name: string;
  Stage_Active_Flag: boolean;
}
export type StageDto = {
  id: string;
  name: string;
  disabled: boolean;
  pending: boolean;
  hasResults: boolean;
  hasExtendedResults: boolean;
}

export type RawTaskDto = {
  Script_ID: string;
  Script_Name: string;
  Script_Active_Flag: boolean;
  //
  Stage_ID: string;
  Stage_Name: string;
  Stage_Active_Flag: boolean;
  //
  ExtendedResults: boolean;
  Result_Flag: boolean;
  /**
   * 0 - заблокирована
   * 1 - открыта
   * 2 - завершена, ожидает расчета
   * 3 - завершена, расчет готов
   */
  stage_status: 0 | 1 | 2 | 3;
}

export type UpdatedTaskStatus = {
  stage_status: RawTaskDto['stage_status'],
};

export type RawTasksDto = RawTaskDto[]
export type TasksDto = ScriptDto[]

export type TasksSliceState = {
  tasks: TasksDto | undefined;
}