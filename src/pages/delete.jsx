import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/user.store'
import { useModeState } from '../store/mode.store'

const DeleteAccount = () => {
    const user = useUserStore((s) => s.user)
    const DeleteUser = useUserStore((s) => s.DeleteUser)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const nav = useNavigate()
    const darkmode = useModeState((s) => s.darkmode)
    const backdarkmode = useModeState((s) => s.backdarkmode)

    const handleDelete = async () => {
        if (!user) {
            setError('You must be logged in to delete your account')
            return
        }

        const confirmed = window.confirm(
            'Deleting your account is permanent. All your listings and profile data will be removed. Continue?'
        )
        if (!confirmed) return

        try {
            setLoading(true)
            await DeleteUser(user, setError, setLoading, user.rest._id)
            setLoading(false)
            nav('/')
        } catch (err) {
            setLoading(false)
            setError(err?.message || 'There was an error deleting your account')
        }
    }

    if (!user) return <div style={{ color: darkmode, backgroundColor: backdarkmode, padding: 24 }}>Please log in to delete your account.</div>

    return (
        <div style={{ color: darkmode, backgroundColor: backdarkmode, padding: 24, minHeight: '80vh' }}>
            <h1>Delete Account</h1>
            <p>
                This action will permanently remove your account and associated data (listings, profile).
                This cannot be undone.
            </p>

            {error && <p style={{ color: '#ff4d4f' }}>{error}</p>}

            <div style={{ marginTop: 16 }}>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    style={{ backgroundColor: '#ff4848', color: '#fff', padding: '10px 16px', border: 'none', borderRadius: 6 }}
                >
                    {loading ? 'Deleting...' : 'Delete My Account'}
                </button>
            </div>
        </div>
    )
}

export default DeleteAccount
