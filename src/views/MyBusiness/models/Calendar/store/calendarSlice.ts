import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Event = {
    id: string;
    title: string;
    start: string;
    end?: string;
    eventColor: string;
    groupId?: undefined;
};

type Events = Event[];

type GetCrmCalendarResponse = Events;

export type CalendarState = {
    loading: boolean;
    eventList: Events;
    dialogOpen: boolean;
    selected: {
        type: string;
    } & Partial<Event>;
};

export const SLICE_NAME = 'crmCalendar';

export const getEvents = createAsyncThunk(
    SLICE_NAME + '/getEvents',
    async () => {
        try {
            // Fazer a solicitação de API diretamente usando axios ou fetch
            const response = await fetch('/crm/calendar', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Você pode adicionar cabeçalhos personalizados, se necessário
                },
            });

            if (!response.ok) {
                throw new Error('Erro na solicitação de API');
            }

            const data: GetCrmCalendarResponse = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

const initialState: CalendarState = {
    loading: false,
    eventList: [],
    dialogOpen: false,
    selected: {
        type: '',
    },
};

const calendarSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateEvent: (state, action) => {
            state.eventList = action.payload;
        },
        openDialog: (state) => {
            state.dialogOpen = true;
        },
        closeDialog: (state) => {
            state.dialogOpen = false;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.eventList = action.payload;
        });
    },
});

export const { updateEvent, openDialog, closeDialog, setSelected } =
    calendarSlice.actions;

export default calendarSlice.reducer;
