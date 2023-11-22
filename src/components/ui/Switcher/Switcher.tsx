import { forwardRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Spinner } from '../Spinner'
import { useConfig } from '../ConfigProvider'
import type { CommonProps } from '../@types/common'
import type { ReactNode, ChangeEvent } from 'react'

export interface SwitcherProps extends CommonProps {
    checked?: boolean
    checkedContent?: string | ReactNode
    color?: string
    defaultChecked?: boolean
    disabled?: boolean
    isLoading?: boolean
    labelRef?: string
    name?: string
    onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void
    readOnly?: boolean
    unCheckedContent?: string | ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field?: any
}

const Switcher = forwardRef<HTMLInputElement, SwitcherProps>((props, ref) => {
    const {
        checked,
        checkedContent,
        className,
        color,
        defaultChecked,
        disabled,
        isLoading = false,
        labelRef,
        name,
        onChange,
        readOnly,
        unCheckedContent,
        field,
        ...rest
    } = props

    const { themeColor, primaryColorLevel } = useConfig()

    const [switcherChecked, setSwitcherChecked] = useState(
        defaultChecked || checked
    )

    useEffect(() => {
        if (typeof checked !== 'undefined') {
            setSwitcherChecked(checked)
        }
    }, [checked])

    const getControlProps = () => {
        let checkedValue = switcherChecked

        let checked: {
            value?: boolean
            defaultChecked?: boolean
            checked?: boolean
        } = {
            value: checkedValue,
        }

        if (field) {
            checkedValue =
                typeof field.value === 'boolean' ? field.value : defaultChecked
            checked = { value: checkedValue, checked: checkedValue }
        }

        if (defaultChecked) {
            checked.defaultChecked = defaultChecked
        }
        return checked
    }

    const controlProps = getControlProps()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const nextChecked = !switcherChecked

        if (disabled || readOnly || isLoading) {
            return
        }

        if (typeof checked === 'undefined') {
            setSwitcherChecked(nextChecked)
            onChange?.(nextChecked, e)
        } else {
            onChange?.(switcherChecked as boolean, e)
        }
    }



    const switcherClass = classNames(
        'switcher ',
        (switcherChecked || controlProps.checked) &&
        `switcher-checked switcher-dark`,
        disabled && 'switcher-disabled',
        className
    )

    return (
        <label ref={labelRef} className={switcherClass}>
            <input
                ref={ref}
                type="checkbox"
                disabled={disabled}
                readOnly={readOnly}
                name={name}
                onChange={handleChange}
                {...controlProps}
                {...field}
                {...rest}
            />
            {isLoading ? (
                <Spinner
                    className={classNames(
                        'switcher-toggle-loading',
                        switcherChecked
                            ? 'switcher-checked-loading'
                            : 'switcher-uncheck-loading'
                    )}
                />
            ) : (
                <div className="switcher-toggle">
                    <div className="crater"></div>
                </div>
            )}
            <span className="switcher-content">
                {switcherChecked ? checkedContent : unCheckedContent}
                <div className="clouds">
                    <div className="cloud cloud-1"></div>
                    <div className="cloud cloud-2"></div>
                    <div className="cloud cloud-3"></div>
                    <div className="cloud cloud-4"></div>
                    <div className="cloud cloud-5"></div>
                </div>
                <div className="backdrops">
                    <div className="backdrop"></div>
                </div>
                <div className="stars">
                    <div className="star star-1"></div>
                    <div className="star star-2"></div>
                    <div className="star star-3"></div>
                </div>
            </span>
        </label>
    )
})

Switcher.displayName = 'Switcher'

export default Switcher
