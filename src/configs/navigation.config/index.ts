import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { useTranslation } from 'react-i18next'

const NavigationConfig = (): NavigationTree[] => {
    const { t } = useTranslation();

    const navigationConfig: NavigationTree[] = [
        {
            key: 'ticket',
            path: '/home',
            title: t('navigation.ticket').toString(),
            translateKey: 'nav.ticket',
            icon: 'ticket',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: []
        },

    ];

    return navigationConfig;
};

export default NavigationConfig;
