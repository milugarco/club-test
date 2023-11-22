import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Tooltip from '@/components/ui/Tooltip'
import {
    HiOutlinePlusCircle,
    HiOutlineSearch,
    HiOutlineViewGrid,
    HiOutlineViewList,
    HiOutlineSortAscending,
    HiOutlineSortDescending,
} from 'react-icons/hi'
import {
    toggleView,
    toggleSort,
    setSearch,
    toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'
import debounce from 'lodash/debounce'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const ActionBar = () => {
    const dispatch = useAppDispatch()

    const inputRef = useRef(null)

    const view = useAppSelector((state) => state.projectList.data.view)
    const { sort } = useAppSelector((state) => state.projectList.data.query)

    const onViewToggle = () => {
        dispatch(toggleView(view === 'grid' ? 'list' : 'grid'))
    }

    const onToggleSort = () => {
        // Inverta a ordenação chamando a função toggleSort com o valor oposto
        const newSort = sort === 'asc' ? 'desc' : 'asc';
        dispatch(toggleSort(newSort));
        
    }

    const onAddNewProject = () => {
        dispatch(toggleNewProjectDialog(true))
    }

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        dispatch(setSearch(val))
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    const { t } = useTranslation()

    return (
        <div className="lg:flex items-center justify-between mb-4">
            <h3 className="mb-4 lg:mb-0">{t("home.paragraph")}</h3>
            <div className="flex flex-row md:items-center gap-1">
                <Input
                    ref={inputRef}
                    size="sm"
                    placeholder={t("home.search").toString()}
                    prefix={<HiOutlineSearch className="text-lg" />}
                    onChange={handleInputChange}
                />
                <Tooltip title={view === 'grid' ? t('tooltip.list') : t('tooltip.grid')}>
                    <Button
                        className="flex"
                        variant="plain"
                        size="sm"
                        icon={
                            view === 'grid' ? (
                                <HiOutlineViewList />
                            ) : (
                                <HiOutlineViewGrid />
                            )
                        }
                        onClick={() => onViewToggle()}
                    />
                </Tooltip>
                <Tooltip title={`${t('tooltip.sort')} ${sort === 'asc' ? 'A-Z' : 'Z-A'}`}>
                    <Button
                        className="flex"
                        variant="plain"
                        size="sm"
                        icon={
                            sort === 'asc' ? (
                                <HiOutlineSortAscending />
                            ) : (
                                <HiOutlineSortDescending />
                            )
                        }
                        onClick={onToggleSort}
                    />
                </Tooltip>
            </div>
        </div>
    )
}

export default ActionBar
