"""
Google Drive / External Archival Storage Service.
Manages synchronization of manifests, document artifacts, and SQLite database snapshots.
Gracefully reports connection and authentication status when credentials are not configured.
"""
import os
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime, timezone

from backend.app.core.config import settings

logger = logging.getLogger(__name__)

class DriveStorageService:
    def __init__(self):
        self.folder_id = settings.GOOGLE_DRIVE_FOLDER_ID
        self.service_account_path = settings.GOOGLE_SERVICE_ACCOUNT_FILE
        self._client = None
        self._is_authenticated = False
        self._initialize_client()

    def _initialize_client(self):
        """Attempt to initialize Google Drive API client if credentials exist."""
        if not self.service_account_path or not Path(self.service_account_path).exists():
            self._is_authenticated = False
            return

        try:
            from google.oauth2 import service_account
            from googleapiclient.discovery import build

            credentials = service_account.Credentials.from_service_account_file(
                self.service_account_path,
                scopes=["https://www.googleapis.com/auth/drive"]
            )
            self._client = build("drive", "v3", credentials=credentials)
            self._is_authenticated = True
            logger.info("Google Drive API client authenticated successfully.")
        except Exception as e:
            logger.warning(f"Google Drive initialization failed: {e}")
            self._is_authenticated = False

    def get_status(self) -> Dict[str, Any]:
        """Return connectivity and configuration status for archival storage."""
        if self._is_authenticated:
            status = "connected"
        elif self.folder_id:
            status = "configured_unauthenticated"
        else:
            status = "unconfigured"

        return {
            "status": status,
            "folder_id": self.folder_id or None,
            "credentials_file_present": bool(self.service_account_path and Path(self.service_account_path).exists()),
            "authenticated": self._is_authenticated,
            "storage_type": "google_drive",
            "last_checked": datetime.now(timezone.utc).isoformat()
        }

    def list_remote_backups(self) -> Dict[str, Any]:
        """List remote backup archives from Google Drive folder."""
        if not self._is_authenticated:
            return {
                "success": False,
                "error": "Google Drive service is not authenticated. Set GOOGLE_SERVICE_ACCOUNT_FILE in .env.",
                "files": []
            }

        try:
            query = f"'{self.folder_id}' in parents and trashed = false" if self.folder_id else "trashed = false"
            results = self._client.files().list(
                q=query,
                pageSize=50,
                fields="nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime)"
            ).execute()
            items = results.get("files", [])
            return {
                "success": True,
                "count": len(items),
                "files": items
            }
        except Exception as e:
            logger.error(f"Failed to list Drive files: {e}")
            return {
                "success": False,
                "error": str(e),
                "files": []
            }

drive_service = DriveStorageService()
