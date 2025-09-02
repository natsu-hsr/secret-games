export const NUMBERLIKE_FIELD_TYPES = ['float', 'coordinates', 'number'];

type NumberlikeField = typeof NUMBERLIKE_FIELD_TYPES[number];

export const FieldNumberLikeStep: Record<NumberlikeField, number> = {
    'float': 0.01,
    'number': 0.01,
} as const;

export const FieldNumberLikePrecision: Record<NumberlikeField, number> = {
    'float': 2,
    'number': 2,
} as const;