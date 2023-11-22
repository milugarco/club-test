import RegisterGuestSimple from './LoginGuestSimple';
import RegisterGuestComplete from './LoginGuestComplete';

const VerificationGuest = () => {
    const document = false


    return (
        <>
            {document === false ? (
                <RegisterGuestComplete />
                ) : (
                    <RegisterGuestSimple />
            )}
        </>
    );
};

export default VerificationGuest;
