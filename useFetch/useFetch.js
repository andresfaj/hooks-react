import React, { useEffect, useRef, useState } from 'react'

export const useFetch = ( url ) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});

    //Un useEffect solito solo se llama una vez, solo se llama
    // cuando se crea/monta/renderiza el componente
    useEffect(() => {

        return () => {
            isMounted.current = false;
        }

    }, []);

    useEffect(() => {

        setState({data: null, loading: true, error: null});

        fetch( url )
            .then( res => {
                    return res.json()
            })
            .then( data => {

                if( isMounted.current ){
                    setState({
                        loading: false,
                        error: null,
                        data: data        
                    });
                }else{
                    console.log('setState no se llamó')
                }
                
            });        
    }, [url]);

    return state;
}
