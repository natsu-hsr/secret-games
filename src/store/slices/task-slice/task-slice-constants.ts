export const taskSliceName = 'task';

export const FETCH_API_PATH = {
  info: 'stage_info',
  table: 'product_list',
  tiles: 'stage_tetris',
  chart: 'stage_product_demand',
  map: 'stage_ya_map',
} as const;

export const POST_API_PATH = {
  form: 'tmp_result',
  task: 'main_result',
} as const;

export const API_PREFIX = {
  fetch: '/api.php',
  post: '/save.php',
} as const;