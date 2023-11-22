import { ColorPicker, Space } from 'antd'

const InputColor = () => {
    return (
        <Space direction="vertical">
            <ColorPicker
                showText={(color) => (
                    <span className="dark:text-white">
                        {color.toHexString()}
                    </span>
                )}
                className="bg-transparent hover:ring-purple-800 hover:border-purple-800 focus:border-purple-800 focus:outline-none shadow-lg"
                style={{ color: 'white !important',
            }}
            />
        </Space>
    )
}

export default InputColor
