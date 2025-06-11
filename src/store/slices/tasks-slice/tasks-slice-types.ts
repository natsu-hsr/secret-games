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
  active: boolean;
  hasResults: boolean;
}

export type RawTaskDto = {
  Script_ID: string;
  Script_Name: string;
  Script_Active_Flag: boolean;
  Result_Flag: boolean;
  //
  Stage_ID: string;
  Stage_Name: string;
  Stage_Active_Flag: boolean;
}

export type RawTasksDto = RawTaskDto[]
export type TasksDto = ScriptDto[]

export type TasksSliceState = {
  tasks: TasksDto | undefined;
}