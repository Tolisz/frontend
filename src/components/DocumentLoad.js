// react
import { useNavigate } from 'react-router-dom';

// microsoft
import { loginRequest, protectedResources } from "../authConfig";

// css
import '../styles/DocumetLoad.css'

const DocumentLoad = ({ error, execute, requestID }) => {
  
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Documenty leca");

        let agr = document.getElementById("agr").files[0];
        let doc = document.getElementById("doc").files[0];

        if (!agr || !doc)
        {
            return;
        }

        // Oba dokumenty zostały wgrane
        let formDataAgr = new FormData();
        formDataAgr.append("file", agr);

        let formDataDoc = new FormData();
        formDataDoc.append("file", agr);

        //console.log("formData = ", formData);

        execute("POST", protectedResources.apiLoanComparer.endpoint + `UploadAgreement/${requestID}`, formDataAgr, 'multipart/form-data')
        .then((result) => {
            console.log(result);
        })
        
        execute("POST", protectedResources.apiLoanComparer.endpoint + `UploadDocument/${requestID}`, formDataDoc, 'multipart/form-data')
        .then((result) => {
            console.log(result);
        })

        navigate("/success");
    }
  
    return (
    <div className='DocumentLoad-island'>
        <div className='DocumentLoad-whole'>

            <div className='DocumentLoad-title'> 
                <div>Jesteś na torze do sukcesu!</div>
                <div> Zostało tylko wgrać niezbędne dokumenty</div>
            </div>

            <form onSubmit={handleSubmit} className='DocumentLoad-Form'>
                <label htmlFor="agr" className='DocumentLoad-label'> Zgoda </label>
                <input type="file" id="agr" name="agreement" className='DocumentLoad-upload-box'/>
                <label htmlFor="doc" className='DocumentLoad-label'> Dokument </label>
                <input type="file" id="doc" name="document" className='DocumentLoad-upload-box'/>

                <button className='DocumentLoad-submit'>Submit</button>
            </form>
                    
        </div>
    </div>
  )
}

export default DocumentLoad