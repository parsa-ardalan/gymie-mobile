import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Exercise = {
  exerciseId: string;
  sets: number[];
  isDone: boolean;
};

type Day = {
  dayOfWeek: number;
  exercises: Exercise[];
};

type WorkoutsState = {
  _id: string | null;
  days: Day[];
};

const initialState: WorkoutsState = {
  _id: null,
  days: [],
};

const workoutsSlice = createSlice({

  name: "workouts",
  initialState,

  reducers: {

    setWorkoutMoves: (_, action: PayloadAction<WorkoutsState>) => {
      return action.payload;
    },

    toggleDoneLocal: (state, action: PayloadAction<{ dayIndex: number; exerciseIndex: number }>) => {

      const { dayIndex, exerciseIndex } = action.payload;
      const exercise = state.days?.[dayIndex]?.exercises?.[exerciseIndex];

      if (exercise) {
        exercise.isDone = !exercise.isDone;
      }
    },

    addLocal: (
      state,
      action: PayloadAction<{ dayIndex: number; exercise: Exercise }>
    ) => {
      const { dayIndex, exercise } = action.payload;

      if (!state.days[dayIndex].exercises) {
        state.days[dayIndex].exercises = [];
      }

      state.days[dayIndex].exercises.push(exercise);
    },
  },
  
});

export const {
  setWorkoutMoves,
  toggleDoneLocal,
  addLocal
} = workoutsSlice.actions;

export default workoutsSlice.reducer;