import { AdminAvatar } from "@/configs/theme.config";
import { UsersAvatarGroup } from "../shared/UsersAvatarGroup";



const AvatarCards: React.FC<AdminAvatar> = ({data}) => {
    return (
        <UsersAvatarGroup
            nameKey="userName"
            imgKey="avatarImg"
            avatarProps={{ size: 40 }}
            users={data}
        />
    )
}
export default AvatarCards


