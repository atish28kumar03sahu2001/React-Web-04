import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";

const removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>?/gm, '');
};

const Trash = () => {
    const useremail = localStorage.getItem("UserMail");
    const [trashMessages, setTrashMessages] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const trashRef = ref(db, `MailClient/${useremail.replace('.', '')}/Trash`);

        onValue(trashRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const trashMessageList = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setTrashMessages(trashMessageList);
            }
        });
    }, [useremail]);

    const handleDelete = (id) => {
        const db = getDatabase();
        const trashMessageRef = ref(db, `MailClient/${useremail.replace('.', '')}/Trash/${id}`);
        remove(trashMessageRef);
        setTrashMessages(trashMessages.filter(message => message.id !== id));
    };

    return (
        <>
            <div className="ListDiv">
                <p className="LHD">{useremail}, This Is Your Trash Section.</p>
                <div className="LIST">
                    {trashMessages.map((message, index) => (
                        <div key={index} className="LL">
                            <p>From: {message.from}</p>
                            <p>Subject: {message.subject}</p>
                            <p>Message: {removeHTMLTags(message.emailtext)}</p>
                            <button onClick={() => handleDelete(message.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Trash;