import jwt from 'jsonwebtoken'

export const generateAccess = (user) => {
    const token = jwt.sign(
        {
            user: {
                user_id : user._id,
                user_name: user.user_name,
                roles: user.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
    )

    return token
}

export const generateRefresh = (user) => {
    const token = jwt.sign(
        {
            user: {
                user_id : user._id,
                user_name: user.user_name,
                roles: user.roles
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    return token
}


