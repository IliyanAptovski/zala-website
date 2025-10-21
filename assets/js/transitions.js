// assets/js/page-transitions.js - With Navigation Highlighting
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Create transition element
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    // Track if we're currently transitioning
    let isTransitioning = false;
    
    // Initialize navigation highlighting based on current page
    updateNavigationHighlighting();
    
    // Intercept link clicks
    document.addEventListener('click', function(e) {
        if (isTransitioning) {
            e.preventDefault();
            return;
        }
        
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Check if we should intercept this link
        if (shouldInterceptLink(link, href)) {
            e.preventDefault();
            
            // Update navigation highlighting before transition
            updateActiveNavLink(link);
            
            startTransition(href);
        }
    });
    
    // Function to determine if link should be intercepted
    function shouldInterceptLink(link, href) {
        // Don't intercept these types of links
        if (link.hasAttribute('download')) return false;
        if (link.getAttribute('target') === '_blank') return false;
        if (href.startsWith('#')) return false;
        if (href.startsWith('mailto:')) return false;
        if (href.startsWith('tel:')) return false;
        if (link.hasAttribute('data-no-transition')) return false;
        if (href.includes('javascript:')) return false;
        
        // Only intercept internal page links
        const isInternal = link.hostname === window.location.hostname || 
                          href.startsWith('/') || 
                          href.startsWith('./') || 
                          href.startsWith('../') ||
                          href === window.location.pathname;
        
        const isHtmlPage = href.endsWith('.html') || 
                          href === '/' || 
                          !href.includes('.') || 
                          href.includes(window.location.origin);
        
        return isInternal && isHtmlPage;
    }
    
    // Function to update active navigation link
    function updateActiveNavLink(clickedLink) {
        // Remove active class from all nav links
        document.querySelectorAll('.navbar a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
    }
    
    // Function to initialize navigation highlighting based on current URL
    function updateNavigationHighlighting() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar a');
        
        // Remove active class from all links first
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate the link that matches current page
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Check if this link points to the current page
            if (isLinkActive(link, currentPath)) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to check if a link is active based on current path
    function isLinkActive(link, currentPath) {
        const href = link.getAttribute('href');
        
        // Handle different href formats
        if (href === '/' || href === 'index.html') {
            return currentPath === '/' || currentPath.endsWith('index.html');
        }
        
        if (href.startsWith('./')) {
            return currentPath.endsWith(href.substring(2));
        }
        
        if (href.startsWith('/')) {
            return currentPath === href;
        }
        
        // For relative paths
        return currentPath.includes(href);
    }
    
    // Function to start the transition
    function startTransition(url) {
        isTransitioning = true;
        
        // Add transitioning class to body
        document.body.classList.add('transitioning');
        
        // Start sweep animation
        transition.classList.remove('sweep-in');
        transition.classList.add('sweep-out');
        
        // Navigate after animation completes
        setTimeout(() => {
            window.location.href = url;
        }, 600);
    }
    
    // Handle page refresh/back button gracefully
    window.addEventListener('beforeunload', function() {
        if (!isTransitioning) {
            // Quick transition out when user refreshes or uses back button
            document.body.classList.add('transitioning');
            transition.classList.add('sweep-out');
        }
    });
    
    // Clean up when page is shown again (from back/forward cache)
    window.addEventListener('pageshow', function() {
        isTransitioning = false;
        document.body.classList.remove('transitioning');
        transition.classList.remove('sweep-out', 'sweep-in');
        
        // Update navigation highlighting when page is shown (back/forward navigation)
        updateNavigationHighlighting();
    });
    
    console.log('Page transitions with navigation highlighting initialized');
});