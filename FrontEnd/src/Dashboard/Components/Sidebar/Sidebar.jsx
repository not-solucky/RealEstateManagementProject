function DashboardSidebar() {
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-item">
                    <div className="sidebar-item-icon">
                        <i className="fas fa-home"></i>
                    </div>
                    <div className="sidebar-item-text">
                        <h4>Home</h4>
                    </div>
                </div>
                <div className="sidebar-item">
                    <div className="sidebar-item-icon">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="sidebar-item-text">
                        <h4>Profile</h4>
                    </div>
                </div>
                <div className="sidebar-item">
                    <div className="sidebar-item-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="sidebar-item-text">
                        <h4>Users</h4>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default DashboardSidebar;