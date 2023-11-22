import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Função simulada para apiGetProjectList
const apiGetProjectList = async (data: GetProjectListRequest) => {
  // Simule uma resposta fictícia
  const fakeProjects: ProjectList = [
    {
      id: 1,
      name: 'Evento de Férias',
      date: '18/11/2023',
      desc: 'Evento realizado por Empreendamente',
      status: 'Em Aberto',
      ticket: 'Diamond',
      colorTicket: '#6597C2',
      event: [
        { name: 'Empresa X', img: 'EMPREENDAMENTE.jpg' },
      ],
    },
    {
        id: 2,
        name: 'Evento de Casa',
        date: '18/11/2023',
        desc: 'Evento realizado por Empreendamente',
        status: 'Finalizado',
        ticket: 'Gold',
        colorTicket: '#959242',
        event: [
          { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
        ],
      },
      {
        id: 3,
        name: 'Festa',
        date: '18/11/2023',
        desc: 'Evento realizado por Empreendamente',
        status: 'Em Andamento',
        ticket: 'Diamond',
        colorTicket: '#6597C2',
        event: [
          { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
        ],
      },
    
      {
        id: 4,
        name: 'Churrasco',
        date: '18/11/2023',
        desc: 'Evento realizado por Empreendamente',
        status: 'Finalizado',
        ticket: 'Gold',
        colorTicket: '#959242',
        event: [
          { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
        ],
      },
    
      {
        id: 5,
        name: 'Time',
        date: '18/11/2023',
        desc: 'Evento realizado por Empreendamente',
        status: 'Finalizado',
        ticket: 'Silver',
        colorTicket: '#96989a',
        event: [
          { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
        ],
      },
    
      {
        id: 6,
        name: 'Campeonato',
        date: '18/11/2023',
        desc: 'Evento realizado por Empreendamente',
        status: 'Em Andamento',
        ticket: 'Diamond',
        colorTicket: '#6597C2',
        event: [
          { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
        ],
      },
    
      {
        id: 8,
        name: 'Evento de Despedida',
        date: '18/11/2023',
        desc: 'Evento realizado por Empreendamente',
        status: 'Em Aberto',
        ticket: 'Gold',
        colorTicket: '#959242',
        event: [
          { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
        ],
      },
    
    //   {
    //     id: 9,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
    //   {
    //     id: 10,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
    //   {
    //     id: 11,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
    //   {
    //     id: 12,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
    //   {
    //     id: 13,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
    //   {
    //     id: 14,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
    //   {
    //     id: 15,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
    //   {
    //     id: 16,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
    //   {
    //     id: 17,
    //     name: 'Evento de Casa',
    //     date: '18/11/2023',
    //     desc: 'Evento realizado por Empreendamente',
    //     status: 'Finalizado',
    //     ticket: 'Gold',
    //     colorTicket: '#959242',
    //     event: [
    //       { name: 'Empresa Y', img: 'EMPREENDAMENTE.jpg' },
    //     ],
    //   },
    
      
    
    
    // Adicione mais projetos fictícios conforme necessário
  ];

  return { data: fakeProjects };
};



// Função simulada para apiGetScrumBoardtMembers
const apiGetScrumBoardtMembers = async () => {
  // Simule uma resposta fictícia
  const fakeMembers: Member[] = [
   
    // Adicione mais membros fictícios conforme necessário
  ];

  const fakeResponse: GetScrumBoardtMembersResponse = { allMembers: fakeMembers };

  return { data: fakeResponse };
};

// Função simulada para apiPutProjectList
const apiPutProjectList = async (data: PutProjectListRequest) => {
  // Simule uma resposta fictícia
  const fakeProjects: ProjectList = [
    // Preencha com projetos fictícios, se necessário
  ];

  return { data: fakeProjects };
};
  
  
  type Member = {
      id: string
      name: string
      email: string
      img: string
  }
  
  type Project = {
      id: number
      name: string
      date: string
      desc: string
      status: "Finalizado" | "Em Aberto" | "Em Andamento"
      ticket: string
      colorTicket: string
      event: Omit<Member, 'id' | 'email'>[]
  }
  
  type ProjectList = Project[]
  
  type Query = {
      sort: 'asc' | 'name' | ''
      search: ''
  }
  
  type GetProjectListRequest = Query
  
  type GetProjectListResponse = ProjectList
  
  type GetScrumBoardtMembersResponse = {
      allMembers: Member[]
  }
  
  type PutProjectListRequest = {
      id: string
      name: string
      desc: string
      status: "Finalizado" | "Em Aberto" | "Em Andamento"
      ticket: string
      colorTicket: string
      event: Omit<Member, 'id' | 'email'>[]
  }
  
  type PutProjectListResponse = ProjectList
  
  export type ProjectListState = {
      loading: boolean
      projectList: ProjectList
      allMembers: {
          value: string
          label: string
          img: string
      }[]
      view: 'grid' | 'list'
      query: Query
      newProjectDialog: boolean
  }
  





  
  export const SLICE_NAME = 'projectList'
  
  export const getList = createAsyncThunk(
      SLICE_NAME + '/getList',
      async (data: GetProjectListRequest) => {
          const response = await apiGetProjectList(data);
          return response.data;
      }
  )
  
  export const getMembers = createAsyncThunk(
      SLICE_NAME + '/getMembers',
      async () => {
          const response = await apiGetScrumBoardtMembers();
          const data = response.data.allMembers.map((item: any) => ({
              value: item.id,
              label: item.name,
              img: item.img,
          }));
          return data;
      }
  )
  
  export const putProject = createAsyncThunk(
      SLICE_NAME + '/putProject',
      async (data: PutProjectListRequest) => {
          const response = await apiPutProjectList(data);
          return response.data;
      }
  )
  
  const initialState: ProjectListState = {
      loading: false,
      projectList: [],
      allMembers: [],
      view: 'grid',
      query: {
          sort: 'asc',
          search: '',
      },
      newProjectDialog: false,
  }
  
  const projectListSlice = createSlice({
      name: `${SLICE_NAME}/state`,
      initialState,
      reducers: {
          toggleView: (state, action) => {
              state.view = action.payload
          },
          toggleSort: (state, action) => {
              state.query.sort = action.payload
          },
          setSearch: (state, action) => {
              state.query.search = action.payload
          },
          toggleNewProjectDialog: (state, action) => {
              state.newProjectDialog = action.payload
          },
      },
      extraReducers: (builder) => {
          builder
              .addCase(getList.fulfilled, (state, action) => {
                  state.projectList = action.payload
                  state.loading = false
              })
              .addCase(getList.pending, (state) => {
                  state.loading = true
              })
              .addCase(getMembers.fulfilled, (state, action) => {
                  state.allMembers = action.payload
              })
              .addCase(putProject.fulfilled, (state, action) => {
                  state.projectList = action.payload
              })
      },
  })
  
  export const { toggleView, toggleSort, toggleNewProjectDialog, setSearch } =
      projectListSlice.actions
  
  export default projectListSlice.reducer
  