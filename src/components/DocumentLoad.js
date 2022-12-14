// react
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Circles } from 'react-loader-spinner'

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

// css
import '../styles/DocumetLoad.css'

const DocumentLoad = ({ requestID }) => {
  
    const navigate = useNavigate();

    const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let doc = document.getElementById("doc").files[0];

        if (!doc)
        {
            return;
        }

        let formDataDoc = new FormData();
        formDataDoc.append("file", doc);

        execute("POST", protectedResources.apiLoanComparer.endpoint + `UploadDocument/${requestID}`, formDataDoc)
        .then((result) => {
            console.log(result);
            
            navigate("/success");
        }).catch(e => {
            setError(true);
            console.log(e);
        });

    }
  
    return (
    <div className='DocumentLoad-island'>
        <div className='DocumentLoad-whole'>

            <div className='DocumentLoad-title'> 
                <div>Jesteś na torze do sukcesu!</div>
                <div> Zostało tylko wgrać niezbędne dokumenty</div>
            </div>

            <form onSubmit={handleSubmit} className='DocumentLoad-Form'>
                <label htmlFor="doc" className='DocumentLoad-label'> Dokument </label>
                <input type="file" id="doc" name="document" className='DocumentLoad-upload-box'/>
                {
                    isLoading 
                        ? 
                    <Circles 
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{ margin: 25}}
                        wrapperClass=""
                        visible={true}
                    />
                        : 
                    <button className='DocumentLoad-submit'>Submit</button>
                }

                {
                    !isLoading && error
                        ?
                    <div> Ups, wygląda na to że nie możesz wgrać dokument, spróbuj ponownie</div>                    
                        :
                    null
                }
            </form>
                    
        </div>
    </div>
  )
}

export default DocumentLoad