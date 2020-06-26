import ProviderService from 'shared/provider.service';

class FormGeneratorService {
    setControlsDataWithProviders = async (formDefinition) => {
        return new Promise( async (resolve, reject) => {
            try {

                let updatedForm = {
                    ...formDefinition,
                    controls: [...formDefinition.controls]
                };
        
                for (let i = 0; i < updatedForm.controls.length; i++) {
                    if ( updatedForm.controls[i].elementConfig.type === 'multi-select' &&
                    updatedForm.controls[i].elementConfig.providers ) {
                        let optionsData = await ProviderService.getApiDataForProvider(updatedForm.controls[i].elementConfig.providers);
                        // console.log("Options Data Received", optionsData);
        
                        let updatedControl = {...updatedForm.controls[i]};
                        updatedControl = {
                            ...updatedControl,
                            elementConfig: {
                                ...updatedControl.elementConfig,
                                options: optionsData
                            }
                        };
        
                        updatedForm.controls[i] = {
                            ...updatedControl
                        }
                    }
                }

                resolve({ updateForm: updatedForm, error: false });
            } catch (error) {
                reject({ updateForm: formDefinition, error: true });
            }
        });
    }
}

export default new FormGeneratorService();