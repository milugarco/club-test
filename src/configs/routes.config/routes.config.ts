import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: []
    },
    /** Profile */
    {
        key: 'profileConfig',
        path: '/profile/settings/my-profile',
        component: lazy(
            () => import('@/views/account/Settings/components/profile')
        ),
        authority: []
    },
    {
        key: 'dsa',
        path: '/teste',
        component: lazy(
            () => import('@/views/auth/SignUp/SignUpFormStepThree')
        ),
        authority: []
    },
    /** Business */
    // {
    //     key: 'myBusiness',
    //     path: '/dashboard/business/my-business',
    //     component: lazy(() => import('@/views/MyBusiness/myBusiness')),
    //     authority: []
    // },
    // {
    //     key: 'calendar',
    //     path: '/dashboard/business/schedule',
    //     component: lazy(() => import('@/views/MyBusiness/models/Schedule')),
    //     authority: []
    // },
    /**Events */
    // {
    //     key: 'createEvent',
    //     path: '/dashboard/event/create-event',
    //     component: lazy(() => import('@/views/Event/CreateEvent')),
    //     authority: []
    // },
    // {
    //     key: 'dashboardEvent',
    //     path: '/my-event',
    //     component: lazy(() => import('@/views/Event/MyEvent/DashEvent')),
    //     authority: []
    // },
    // {
    //     key: 'eventManagement',
    //     path: '/event-management',
    //     component: lazy(() => import('@/views/Event/CreateTicket')),
    //     authority: []
    // },
    // {
    //     key: 'myEvents',
    //     path: '/dashboard/event/my-events',
    //     component: lazy(() => import('@/views/Event/MyEvents')),
    //     authority: []
    // },

    /**Ticket */
    // {
    //     key: 'createTicket',
    //     path: '/dashboard/event/create-ticket',
    //     component: lazy(() => import('@/views/Event/CreateTicket')),
    //     authority: []
    // },
    // {
    //     key: 'dashTicket',
    //     path: '/dashboard/event/ticket',
    //     component: lazy(() => import('@/views/Event/MyEvent/DashTicket')),
    //     authority: []
    // },
    /**Guests */
    // {
    //     key: 'dashGuests',
    //     path: '/dashboard/event/guests',
    //     component: lazy(() => import('@/views/Event/MyEvent/DashGuests')),
    //     authority: []
    // },
    // {
    //     key: 'dashGuests',
    //     path: '/dashboard/event/guests/manage-guests',
    //     component: lazy(() => import('@/views/Event/CreateGuest')),
    //     authority: []
    // },
    // {
    //     key: 'credentials',
    //     path: '/dashboard/event/credentials',
    //     component: lazy(() => import('@/views/credentials/credentials')),
    //     authority: []
    // },

    //Invicta Club
    {
        key: 'guestStepOne',
        path: '/dashboard/event/guest',
        component: lazy(
            () => import('@/views/authGuestNew/LoginGuestVerification')
        ),
        authority: []
    },
    {
        key: 'event',
        path: '/club/event/my-events/event',
        component: lazy(() => import('@/views/Event/EventHome')),
        authority: []
    },
    // {
    //     key: 'GuestStepTwo',
    //     path: '/event/guest/id/facial',
    //     component: lazy(() => import('@/views/authGuest/GuestStepFour')),
    //     authority: []
    // },
    // {
    //     key: 'GuestStepTen',
    //     path: '/event/guest/id/qrcode',
    //     component: lazy(() => import('@/views/authGuest/GuestStepTen')),
    //     authority: []
    // },
    // {
    //     key: 'GuestStepPassword',
    //     path: '/event/guest/id/password',
    //     component: lazy(() => import('@/views/authGuest/GuestStepThree')),
    //     authority: []
    // },
    // {
    //     key: 'GuestStepCodVerification',
    //     path: '/event/guest/id/verification',
    //     component: lazy(() => import('@/views/authGuest/GuestStepTwo')),
    //     authority: []
    // },
    // {
    //     key: 'GuestStepPersonalProfile',
    //     path: '/event/guest/id/personal-profile',
    //     component: lazy(() => import('@/views/authGuest/PageProfile')),
    //     authority: []
    // },
    // {
    //     key: 'GuestStepNone',
    //     path: '/event/guest/id/terms',
    //     component: lazy(() => import('@/views/authGuest/GuestStepNine')),
    //     authority: []
    // },
    // {
    //     key: 'ClubSignUpThree',
    //     path: '/SignUpThree',
    //     component: lazy(
    //         () => import('@/views/auth/SignUp/SignUpFormStepThree')
    //     ),
    //     authority: []
    // },
    // {
    //     key: 'CardGuest',
    //     path: '/event/guest/id/Card',
    //     component: lazy(() => import('@/components/ui/cardShare/CardStory')),
    //     authority: []
    // },
    // {
    //     key: 'CardGuestPost',
    //     path: '/event/guest/id/CardPost',
    //     component: lazy(() => import('@/components/ui/cardShare/CardPost')),
    //     authority: []
    // }
]
