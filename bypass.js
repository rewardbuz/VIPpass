(function(){
    // 1. Supported Sites List (Broader match for variants)
    const supportedSites = [
        'cinemx.lk', 
        'animationhubbb.blogspot.com', 
        'unlockify.ink', 
        'rekonise.com', 
        'sub2unlock.me',
        'sub2unlock',
        'subtounlock'
    ];
    const currentHost = window.location.hostname;
    
    let isSupported = false;
    for(let site of supportedSites) {
        if(currentHost.includes(site)) {
            isSupported = true;
            break;
        }
    }

    // 2. HTML Popup Box Eka Hadanawa (DOM Injection)
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.padding = '15px 25px';
    popup.style.borderRadius = '10px';
    popup.style.zIndex = '9999999';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.fontWeight = 'bold';
    popup.style.color = '#fff';
    popup.style.boxShadow = '0 5px 15px rgba(0,0,0,0.4)';
    popup.style.transition = 'opacity 0.5s ease';

    if(isSupported) {
        popup.style.backgroundColor = '#00c564'; // Green for supported
        popup.innerHTML = '✅ VIP Unlocker: Supported Site!<br><span style="font-size:12px;font-weight:normal;">Bypassing protection...</span>';
        document.body.appendChild(popup);
        
        setTimeout(() => {
            let bypassed = false;
            
            // Method 1: Unlockify
            const u = document.querySelector('[data-reward-url]');
            if(u && u.getAttribute('data-reward-url')){ window.location.href = u.getAttribute('data-reward-url'); return; }
            
            // Method 2: Cinemx
            const c = document.querySelector('a[data-em]');
            if(c){
                try{
                    const d = atob(c.getAttribute('data-em'));
                    const m = d.match(/src=["']([^"']+)["']/);
                    if(m && m[1]){ window.location.href = m[1]; return; }
                } catch(e){}
            }
            
            // Method 3: Animation Hub
            for(let s of document.querySelectorAll('script')){
                let m = s.innerHTML.match(/FINAL_VIDEO_LINK\s*=\s*["']([^"']+)["']/);
                if(m && m[1]){ window.location.href = m[1]; return; }
            }
            
            // Method 4: Rekonise & Sub2Unlock / Force Enable Buttons
            document.querySelectorAll('button[disabled], button.mat-mdc-button-disabled, .disabled, #file').forEach(btn => {
                btn.removeAttribute('disabled'); 
                btn.disabled = false; 
                btn.classList.remove('mat-mdc-button-disabled', 'disabled');
                btn.style.opacity = '1'; 
                btn.style.pointerEvents = 'auto'; 
                btn.style.cursor = 'pointer';
                bypassed = true;
            });

            // Sub2Unlock hidden form display
            const subForm = document.querySelector('#link-view');
            if(subForm) {
                subForm.style.display = 'block';
                bypassed = true;
            }
            
            if(bypassed) {
                popup.innerHTML = '🔓 Protection Disabled! Click the button.';
            } else {
                popup.innerHTML = '⚠️ Waiting or no links found!';
                popup.style.backgroundColor = '#f39c12';
            }
            
            setTimeout(() => { popup.style.opacity = '0'; setTimeout(() => popup.remove(), 500); }, 4000);
            
        }, 1000);
        
    } else {
        // Red for unsupported
        popup.style.backgroundColor = '#ff4c4c';
        popup.innerHTML = '❌ VIP Unlocker: Not Supported.<br><span style="font-size:12px;font-weight:normal;">This website is not in our database.</span>';
        document.body.appendChild(popup);
        
        setTimeout(() => { popup.style.opacity = '0'; setTimeout(() => popup.remove(), 500); }, 4000);
    }
})();
