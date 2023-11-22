import { JwtPayload, jwtDecode } from 'jwt-decode'

export function decodeJWT(token: string) {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded
}
